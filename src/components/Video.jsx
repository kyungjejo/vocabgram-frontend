import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledReactPlayer = styled(ReactPlayer)`
    min-width: 60%;
    max-width: 860px;
    margin: 8px auto;
`

const SmallReactPlayer = styled(ReactPlayer)`
    min-width: 30%;
    max-width: 420px;
    height: auto !important;
    margin: 8px auto;
    padding: 4px;
`

const mapStateToProps = state => ({
    ...state
})

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setReady: false,
            offsetTime: 5,
            divActive: false,
            currentTime: 0,
        };
        this.onProgressHandler = this.onProgressHandler.bind(this);
        this.onReadyHandler = this.onReadyHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { offsetTime, youtubeId } = nextProps;
        if ( offsetTime)
        this.setState({
            offsetTime: offsetTime,
            youtubeId: youtubeId,
        })
    }

    onProgressHandler(info) {
        const { offsetTime, targetTime } = this.props;
        const { playedSeconds } = info;
        if (this.player && playedSeconds>targetTime + offsetTime) {
            let videoPlayers = document.getElementsByClassName('video-player');
            for (let i=0; i<videoPlayers.length; i++) {
                document.getElementsByClassName('video-player')[i].firstElementChild.pause();
            }
            this.player.seekTo(targetTime - offsetTime,"seconds");
        }
        if (this.player && playedSeconds<targetTime - offsetTime) {
            let videoPlayers = document.getElementsByClassName('video-player');
            for (let i=0; i<videoPlayers.length; i++) {
                document.getElementsByClassName('video-player')[i].firstElementChild.pause();
            }
            this.player.seekTo(targetTime - offsetTime,"seconds");
        }
        if (this.player) {
            if (playedSeconds>targetTime - 1 && playedSeconds<targetTime + 1) {
                let videoPlayers = document.getElementsByClassName('video-player');
                for (let i=0; i<videoPlayers.length; i++) {
                    document.getElementsByClassName('video-player')[i].firstElementChild.muted = true;
                }
            }
                // this.player.mute();
            else {
                let videoPlayers = document.getElementsByClassName('video-player');
                for (let i=0; i<videoPlayers.length; i++) {
                    document.getElementsByClassName('video-player')[i].firstElementChild.muted = false;
                }
                // document.getElementsByClassName('video-player')[0].firstElementChild.muted = false;
                // this.player.unmute();
            }
        }
        if (playedSeconds>targetTime - 1 && playedSeconds<targetTime + 1) this.setState({divActive: true})
        else this.setState({divActive: false})
    }

    onReadyHandler() {
        const { targetTime } = this.props;
        const { setReady, offsetTime } = this.state;
        if (!setReady) {
            this.setState({setReady: !setReady})
            this.player.seekTo(targetTime - offsetTime,"seconds");
        }
    }

    render() {
        const { youtubeId, type, sentNum, word } = this.props;
        const { divActive } = this.state;
        return (
            type === 'practice' ?
                <SmallReactPlayer ref={player => { this.player = player; }}
                    className="video-player"
                    url={[`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/video/${youtubeId}.mp4`]}
                    type='video/mp4'
                    controls
                    autoPlay={false}
                    progressInterval={500}
                    onProgress={this.onProgressHandler}
                    onReady={this.onReadyHandler}
                    config={{ file: {
                        attributes: {
                            crossOrigin: 'true'
                        },
                        tracks: [{
                            src:`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/subtitle_masked/${youtubeId}_${sentNum}_${word}_masked.en.vtt`,
                            label:'English',
                            kind:'captions',
                            srcLang:'en',
                            default:true,
                        }]
                    }}}
                />
                :
            <div>
                <StyledReactPlayer ref={player => { this.player = player; }}
                    style={{ padding: '6px', background: divActive ? 'red' : 'unset' }}
                    url={[`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/video/${youtubeId}.mp4`]}
                    type='video/mp4'
                    className="video-player"
                    controls
                    autoPlay={false}
                    progressInterval={500}
                    onProgress={this.onProgressHandler}
                    onReady={this.onReadyHandler}
                    config={{ file: {
                        attributes: {
                            crossOrigin: 'true'
                        },
                        tracks: [{
                            src:`https://s3.ap-northeast-2.amazonaws.com/exprgram.kyungjejo.com/subtitle/${youtubeId}.en.vtt`,
                            label:'English',
                            kind:'captions',
                            srcLang:'en',
                            default:true,
                        }]
                    }}}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Video)